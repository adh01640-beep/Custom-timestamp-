import { storage } from "@revenge-mod/plugin";
import { ReactNative as RN } from "@revenge-mod/metro/common";
import React from "react";

const { View, Text, TextInput } = RN;

export default function Settings() {
    return (
        <View style={{ padding: 16 }}>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
                إعدادات الوقت المخصص 🔧
            </Text>
            <Text style={{ color: "#aaa", fontSize: 14, marginBottom: 15 }}>
                رتب الرموز: HH (ساعات) | mm (دقائق) | ss (ثواني) | DD (يوم) | MM (شهر) | YYYY (سنة)
            </Text>
            <TextInput 
                style={{ backgroundColor: "#2b2d31", color: "#fff", padding: 12, borderRadius: 8 }}
                defaultValue={storage.format || "HH:mm:ss"}
                onChangeText={(text) => { storage.format = text }}
            />
        </View>
    );
}
