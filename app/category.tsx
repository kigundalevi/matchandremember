import { View, Text, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useGame, type Category } from '@/lib/game-context';
import * as Haptics from 'expo-haptics';

type CategoryOption = {
  id: Category;
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  descriptionColor: string;
};

const categories: CategoryOption[] = [
  {
    id: 'animals',
    title: 'Animals',
    description: 'Find the cute pets',
    icon: '🐾',
    bgColor: 'bg-[#D4EFE8]',
    descriptionColor: 'text-[#6EB5A7]',
  },
  {
    id: 'shapes',
    title: 'Shapes',
    description: 'Stars and circles',
    icon: '🔷',
    bgColor: 'bg-[#D6E8F0]',
    descriptionColor: 'text-[#6EB5A7]',
  },
  {
    id: 'numbers',
    title: 'Numbers',
    description: 'Learn 1, 2, 3',
    icon: '📐',
    bgColor: 'bg-[#E8D9F0]',
    descriptionColor: 'text-[#9B7DB8]',
  },
];

export default function CategoryScreen() {
  const router = useRouter();
  const { setCategory } = useGame();

  const handleCategorySelect = (categoryId: Category) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setCategory(categoryId);
    router.push('/difficulty');
  };

  const handleBack = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header with Back Button */}
        <View className="flex-row items-center mb-8">
          <TouchableOpacity
            onPress={handleBack}
            className="w-12 h-12 items-center justify-center rounded-full bg-surface mr-4"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}
          >
            <Text className="text-2xl text-primary">‹</Text>
          </TouchableOpacity>
          <Text className="text-3xl font-bold text-foreground flex-1">Select a Theme</Text>
        </View>

        {/* Category Cards */}
        <View className="gap-6 pb-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onSelect={() => handleCategorySelect(category.id)}
            />
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

type CategoryCardProps = {
  category: CategoryOption;
  onSelect: () => void;
};

function CategoryCard({ category, onSelect }: CategoryCardProps) {
  return (
    <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.9}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <View className={`${category.bgColor} rounded-3xl p-8 items-center`}>
        {/* Icon Circle */}
        <View className="w-24 h-24 rounded-full bg-white items-center justify-center mb-6">
          <Text style={{ fontSize: 48 }}>{category.icon}</Text>
        </View>

        {/* Title */}
        <Text className="text-3xl font-bold text-foreground mb-2 text-center">
          {category.title}
        </Text>

        {/* Description */}
        <Text className={`text-lg ${category.descriptionColor} text-center mb-6`}>
          {category.description}
        </Text>

        {/* Play Button */}
        <TouchableOpacity
          onPress={onSelect}
          className="bg-primary px-12 py-3 rounded-full"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
          }}
        >
          <Text className="text-white text-lg font-bold">Play</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
