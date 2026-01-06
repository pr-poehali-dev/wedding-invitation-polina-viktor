import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [guestName, setGuestName] = useState('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [foodPreferences, setFoodPreferences] = useState<string[]>([]);
  const [allergyText, setAllergyText] = useState('');
  const [drinkPreferences, setDrinkPreferences] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const colorOptions = [
    { id: 'olive', name: 'Оливковый', color: '#4d5c22' },
    { id: 'sage', name: 'Шалфей', color: '#a6b15f' },
    { id: 'beige', name: 'Бежевый', color: '#8d7a54' },
    { id: 'silver', name: 'Серебристый', color: '#bebdc2' },
    { id: 'ivory', name: 'Слоновая кость', color: '#f0f0ef' },
    { id: 'black', name: 'Строгий черный', color: '#000000' },
  ];

  const foodOptions = [
    { id: 'nomeat', name: 'Не ем мясо', icon: 'X' },
    { id: 'nofish', name: 'Не ем рыбу', icon: 'X' },
    { id: 'noseafood', name: 'Не ем морепродукты', icon: 'X' },
  ];

  const drinkOptions = [
    { id: 'wine', name: 'Вино', icon: 'Wine' },
    { id: 'champagne', name: 'Шампанское', icon: 'Sparkles' },
    { id: 'cognac', name: 'Коньяк', icon: 'GlassWater' },
    { id: 'vodka', name: 'Водка', icon: 'GlassWater' },
    { id: 'whisky', name: 'Виски', icon: 'GlassWater' },
    { id: 'nonalcoholic', name: 'Безалкогольные напитки', icon: 'Coffee' },
  ];

  const toggleSelection = (id: string, list: string[], setList: (list: string[]) => void) => {
    if (list.includes(id)) {
      setList(list.filter(item => item !== id));
    } else {
      setList([...list, id]);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-muted/50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        
        <div className="text-center mb-16 animate-fade-in">
          <div className="mb-8 flex justify-center">
            <img 
              src="https://cdn.poehali.dev/files/pTV-Ny2I8orahYd1LjEDbzcIUoQAuar6OQl43DE4cOMrHv9v015kQtsySws_x1T9R2MdUjdQf8FMReCYmOsbgAym.jpg" 
              alt="Полина, Виктор и их котик" 
              className="w-64 h-64 object-cover rounded-full border-4 border-primary/20 shadow-xl animate-float"
            />
          </div>
          <h1 className="text-6xl md:text-7xl font-cormorant font-semibold text-primary mb-4">
            Полина & Виктор
          </h1>
          <div className="flex flex-col items-center justify-center gap-3 text-lg text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Icon name="Calendar" size={20} />
              <span>18 июля 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="MapPin" size={20} />
              <span>ул. Гагарина, 50, д. Брод</span>
            </div>
            <div className="flex items-center gap-2 text-primary/80">
              <Icon name="Clock" size={20} />
              <span className="italic">Время мероприятия будет сообщено позже</span>
            </div>
          </div>
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-xl text-foreground/80 font-light italic">
              Приглашаем вас разделить с нами этот особенный день
            </p>
            <p className="text-lg text-foreground/70 font-light leading-relaxed">
              Мы мечтали об этом моменте, и теперь хотим, чтобы вы были рядом, когда наши сердца соединятся навсегда. 
              Ваше присутствие сделает этот день по-настоящему незабываемым! 💕
            </p>
          </div>
        </div>

        {!submitted ? (
          <div className="space-y-8">
            <Card className="p-8 shadow-lg border-2 border-primary/10 animate-fade-in">
              <div className="mb-6">
                <Label htmlFor="guestName" className="text-lg font-cormorant">Ваше имя</Label>
                <Input
                  id="guestName"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Введите ваше имя"
                  className="mt-2 text-lg"
                />
              </div>
            </Card>

            <Card className="p-8 shadow-lg border-2 border-primary/10 animate-fade-in">
              <h2 className="text-3xl font-cormorant font-semibold text-primary mb-6 flex items-center gap-3">
                <Icon name="Palette" size={28} />
                Цветовая гамма праздника
              </h2>
              <p className="text-muted-foreground mb-6">
                Это официальная цветовая гамма нашей свадьбы. Выберите цвета, которые вам больше всего нравятся:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {colorOptions.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => toggleSelection(color.id, selectedColors, setSelectedColors)}
                    className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                      selectedColors.includes(color.id)
                        ? 'border-primary shadow-lg'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div
                      className="w-full h-20 rounded-lg mb-3"
                      style={{ backgroundColor: color.color }}
                    />
                    <p className="text-sm font-medium text-center">{color.name}</p>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-8 shadow-lg border-2 border-primary/10 animate-fade-in">
              <h2 className="text-3xl font-cormorant font-semibold text-primary mb-6 flex items-center gap-3">
                <Icon name="UtensilsCrossed" size={28} />
                Предпочтения в еде
              </h2>
              <p className="text-muted-foreground mb-6">
                Отметьте ограничения, если они есть:
              </p>
              <div className="space-y-4">
                {foodOptions.map((food) => (
                  <div
                    key={food.id}
                    className="flex items-center space-x-3 p-4 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                    onClick={() => toggleSelection(food.id, foodPreferences, setFoodPreferences)}
                  >
                    <Checkbox
                      id={food.id}
                      checked={foodPreferences.includes(food.id)}
                      onCheckedChange={() => toggleSelection(food.id, foodPreferences, setFoodPreferences)}
                    />
                    <Icon name={food.icon as any} size={24} className="text-primary" />
                    <Label htmlFor={food.id} className="text-lg cursor-pointer flex-grow">
                      {food.name}
                    </Label>
                  </div>
                ))}
                <div className="mt-6">
                  <Label htmlFor="allergy" className="text-lg mb-2 block">Если у вас есть аллергия, укажите на что:</Label>
                  <Input
                    id="allergy"
                    value={allergyText}
                    onChange={(e) => setAllergyText(e.target.value)}
                    placeholder="Например: орехи, лактоза, глютен..."
                    className="text-lg"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-8 shadow-lg border-2 border-primary/10 animate-fade-in">
              <h2 className="text-3xl font-cormorant font-semibold text-primary mb-6 flex items-center gap-3">
                <Icon name="Martini" size={28} />
                Предпочтения в напитках
              </h2>
              <p className="text-muted-foreground mb-6">
                Какие напитки вы предпочитаете:
              </p>
              <div className="space-y-4">
                {drinkOptions.map((drink) => (
                  <div
                    key={drink.id}
                    className="flex items-center space-x-3 p-4 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                    onClick={() => toggleSelection(drink.id, drinkPreferences, setDrinkPreferences)}
                  >
                    <Checkbox
                      id={drink.id}
                      checked={drinkPreferences.includes(drink.id)}
                      onCheckedChange={() => toggleSelection(drink.id, drinkPreferences, setDrinkPreferences)}
                    />
                    <Icon name={drink.icon as any} size={24} className="text-primary" />
                    <Label htmlFor={drink.id} className="text-lg cursor-pointer flex-grow">
                      {drink.name}
                    </Label>
                  </div>
                ))}
              </div>
            </Card>

            <div className="text-center pt-4">
              <Button
                onClick={handleSubmit}
                disabled={!guestName.trim()}
                size="lg"
                className="text-lg px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Отправить предпочтения
                <Icon name="Heart" size={20} className="ml-2" />
              </Button>
            </div>
          </div>
        ) : (
          <Card className="p-12 text-center shadow-2xl border-2 border-primary/20 animate-fade-in">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Check" size={48} className="text-primary" />
              </div>
            </div>
            <h2 className="text-4xl font-cormorant font-semibold text-primary mb-4">
              Спасибо, {guestName}!
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Ваши предпочтения сохранены. Мы с нетерпением ждём встречи с вами!
            </p>
            <div className="flex items-center justify-center gap-2 text-3xl">
              <Icon name="Heart" size={32} className="text-primary animate-float" />
              <Icon name="Sparkles" size={32} className="text-secondary" />
              <Icon name="Heart" size={32} className="text-primary animate-float" />
            </div>
          </Card>
        )}

        <div className="mt-16 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Icon name="Heart" size={16} className="text-primary" />
            С любовью, Полина и Виктор
            <Icon name="Heart" size={16} className="text-primary" />
          </p>
        </div>
      </div>
    </div>
  );
}