import { useEffect, useState } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import dayjs from "dayjs";

import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";

interface Params {
  date: string;
}

export function Habit() {
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { date } = route.params as Params;

  const parsedDate = dayjs(date);
  const dayOfWeeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  async function fetchHabits() {
    try {
      setLoading(true);

      const response = await api.get("/day", { params: { date } });
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Ops",
        "Não foi possivel carregar as informações dos hábitos"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={45} />

        <View className="mt-6">
          <Checkbox title="Beber agua todos os dias" checked={false} />
          <Checkbox title="testeeeeeeee" checked={false} />
        </View>
      </ScrollView>
    </View>
  );
}
