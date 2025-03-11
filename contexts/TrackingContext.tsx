import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";
import * as Location from "expo-location";
import { useAuth } from "@/contexts/AuthContext";

interface TrackingContextProps {
  socket: Socket | null;
  isConnected: boolean;
}

const TrackingContext = createContext<TrackingContextProps | undefined>(
  undefined
);

interface TrackingProviderProps {
  children: ReactNode;
}

export const TrackingProvider: React.FC<TrackingProviderProps> = ({
  children,
}) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const newSocket = io("https://serveur-production-7b71.up.railway.app", {
      transports: ["websocket"],
      path: "/socket.io",
    });

    newSocket.on("connect", () => {
      console.log("✅ Socket connecté :", newSocket.id);
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      console.warn("⚠️ Socket déconnecté");
      setIsConnected(false);
    });

    setSocket(newSocket);

    return () => newSocket.disconnect(); // Déconnexion propre
  }, []);

  useEffect(() => {
       // Ensure the user is a delivery partner, socket is connected, and user exists
       if (!user || user.role !== "delivery partner" || !socket || !isConnected) {
        return;
      }
    //if (!socket || !isConnected || !user) return;

    const trackDriverLocation = async () => {
      console.log("📍 Demande d'autorisation de localisation...");
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("⛔ Autorisation de localisation refusée");
        return;
      }

      console.log("✅ Autorisation accordée, tracking en cours...");
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (location) => {
          if (socket.connected) {
            console.log("📡 Envoi de la position...");
            socket.emit("location_update", {
              partnerId: user.uid,
              location: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              },
            });
          } else {
            console.warn(
              "🚫 Socket non connecté, impossible d'envoyer la position"
            );
          }
        }
      );
    };

    trackDriverLocation();
  }, [socket, isConnected, user]);

  return (
    <TrackingContext.Provider value={{ socket, isConnected }}>
      {children}
    </TrackingContext.Provider>
  );
};

export const useTracking = (): TrackingContextProps => {
  const context = useContext(TrackingContext);
  if (!context) {
    throw new Error("useTracking must be used within a TrackingProvider");
  }
  return context;
};
