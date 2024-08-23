import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import * as FileSystem from "expo-file-system";

import Button from "./components/Button";

export default function App() {
  const [selectedDocument, setSelectedDocument] = useState(null);

  const extractContentFromPDF = async (uri) => {
    const pdfBytes = await FileSystem.readAsStringAsync(uri, "base64");
    const pdfDoc = await PDFDocument.load(pdfBytes);

    const pages = pdfDoc.getPages();
    const textContent = pages.map((page) => page.getTextContent());
    const images = [];

    return { textContent, images };
  };

  const chatWithPDFContent = async (text) => {};

  const pickDocumentAsync = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });
    if (!result.canceled) {
      setSelectedDocument(result.assets[0].uri);
    } else {
      alert("You did not select any document.");
    }
  };
  return (
    <View style={styles.container}>
      <Button
        label="Select PDF"
        onPress={pickDocumentAsync}
        theme={"primary"}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
});
