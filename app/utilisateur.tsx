import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Image } from "react-native";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";

export default function Utilisateur() {
  const { loading, login } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [pass, setPassword] = useState<string>("");

  const handleLogin = async () => {
    try {
      await login(email, pass);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        
        {/* Champ Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t("auth.emailLabel")}</Text>
          <TextInput
            placeholder={t("auth.emailPlaceholder")}
            placeholderTextColor="gray"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Champ Mot de passe */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t("auth.passwordLabel")}</Text>
          <TextInput
            placeholder={t("auth.passwordPlaceholder")}
            placeholderTextColor="gray"
            style={styles.input}
            secureTextEntry
            value={pass}
            onChangeText={setPassword}
          />
        </View>

        {/* Options : Se souvenir / Mot de passe oublié */}
        <View style={styles.rowBetween}>
          <View style={styles.rememberView}>
            {/* <CheckBox /> */}
            <Text style={styles.rememberText}>{t("auth.rememberMe")}</Text>
          </View>
          <Link href="/password" style={styles.forgotPassword}>
            {t("auth.forgotPassword")}
          </Link>
        </View>

        {/* Bouton de Connexion */}
        <TouchableOpacity 
          onPress={handleLogin}
          disabled={loading}
          style={styles.loginButton}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" style={styles.indicator} />
          ) : (
            <Text style={styles.loginButtonText}>{t("auth.loginButton")}</Text>
          )}
        </TouchableOpacity>

        {/* Séparateur OU */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>{t("auth.or")}</Text>
          <View style={styles.line} />
        </View>

        {/* Redirection Inscription */}
        <Pressable onPress={() => router.push("/sign")} style={styles.registerContainer}>
          <Text style={styles.registerText}>
            {t("auth.noAccount")}{" "}
            <Text style={styles.registerLink}>{t("auth.register")}</Text>
          </Text>
        </Pressable>

        {/* Bouton Connexion Facebook */}
        <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
          <Image
            source={require("../assets/images/facebook.png")}
            resizeMode="contain"
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>{t("auth.continueFacebook")}</Text>
        </TouchableOpacity>

        {/* Bouton Connexion Google */}
        <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
          <Image
            source={require("../assets/images/google.png")}
            resizeMode="contain"
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>{t("auth.continueGoogle")}</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "white",
    fontSize: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    height: 48,
    paddingHorizontal: 12,
    color: "#1F2937",
    width: "100%",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  rememberView: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberText: {
    fontSize: 14,
    color: "#4B5563",
  },
  forgotPassword: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  loginButton: {
    height: 50,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  indicator: {
    marginRight: 8,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  orText: {
    color: "#9CA3AF",
    marginHorizontal: 12,
    fontSize: 14,
  },
  registerContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  registerText: {
    color: "#6B7280",
    fontSize: 14,
  },
  registerLink: {
    color: "green",
    fontWeight: "bold",
  },
  socialButton: {
    height: 48,
    width: "100%",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "white",
    paddingHorizontal: 16,
    justifyContent: "center",
    marginBottom: 12,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
});