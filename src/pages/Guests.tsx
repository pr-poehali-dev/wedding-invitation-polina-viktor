import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import * as XLSX from 'xlsx';

interface Guest {
  id: number;
  guestName: string;
  foodPreferences: string[];
  allergyText: string;
  drinkPreferences: string[];
  createdAt: string;
}

export default function Guests() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/e4343a47-9082-4c5a-8a34-3e246177ac60');
      const data = await response.json();
      setGuests(data.guests || []);
    } catch (error) {
      console.error('Error fetching guests:', error);
    } finally {
      setLoading(false);
    }
  };

  const foodLabels: { [key: string]: string } = {
    nomeat: 'Не ем мясо',
    nofish: 'Не ем рыбу',
    noseafood: 'Не ем морепродукты',
  };

  const drinkLabels: { [key: string]: string } = {
    wine: 'Вино',
    champagne: 'Шампанское',
    cognac: 'Коньяк',
    vodka: 'Водка',
    whisky: 'Виски',
    nonalcoholic: 'Безалкогольные напитки',
  };

  const downloadExcel = () => {
    const data = guests.map(guest => ({
      'Имя гостя': guest.guestName,
      'Ограничения в еде': guest.foodPreferences.map(f => foodLabels[f] || f).join(', ') || 'Нет',
      'Аллергия': guest.allergyText || 'Нет',
      'Напитки': guest.drinkPreferences.map(d => drinkLabels[d] || d).join(', ') || 'Не указаны',
      'Дата ответа': new Date(guest.createdAt).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Гости');
    
    ws['!cols'] = [
      { wch: 20 },
      { wch: 30 },
      { wch: 20 },
      { wch: 40 },
      { wch: 25 }
    ];
    
    XLSX.writeFile(wb, `Ответы_гостей_${new Date().toLocaleDateString('ru-RU')}.xlsx`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-muted/50 flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={48} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Загрузка ответов гостей...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-muted/50">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-cormorant font-semibold text-primary mb-4">
            Ответы гостей
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Всего ответили: <span className="font-semibold text-primary">{guests.length}</span> {guests.length === 1 ? 'гость' : 'гостей'}
          </p>
          {guests.length > 0 && (
            <Button onClick={downloadExcel} size="lg" className="gap-2">
              <Icon name="Download" size={20} />
              Скачать Excel
            </Button>
          )}
        </div>

        {guests.length === 0 ? (
          <Card className="p-12 text-center">
            <Icon name="Users" size={64} className="text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-xl text-muted-foreground">
              Пока никто не заполнил форму
            </p>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {guests.map((guest) => (
              <Card key={guest.id} className="p-6 shadow-lg border-2 border-primary/10 hover:border-primary/30 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-cormorant font-semibold text-primary">
                    {guest.guestName}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {new Date(guest.createdAt).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>

                <div className="space-y-4">
                  {guest.foodPreferences.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="UtensilsCrossed" size={18} className="text-primary" />
                        <h4 className="font-medium text-sm text-muted-foreground">Ограничения в еде:</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {guest.foodPreferences.map((pref) => (
                          <span key={pref} className="px-3 py-1 bg-secondary rounded-full text-sm">
                            {foodLabels[pref] || pref}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {guest.allergyText && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="AlertCircle" size={18} className="text-primary" />
                        <h4 className="font-medium text-sm text-muted-foreground">Аллергия:</h4>
                      </div>
                      <p className="text-sm bg-secondary/50 p-3 rounded-lg">{guest.allergyText}</p>
                    </div>
                  )}

                  {guest.drinkPreferences.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="Martini" size={18} className="text-primary" />
                        <h4 className="font-medium text-sm text-muted-foreground">Напитки:</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {guest.drinkPreferences.map((pref) => (
                          <span key={pref} className="px-3 py-1 bg-secondary rounded-full text-sm">
                            {drinkLabels[pref] || pref}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {guest.foodPreferences.length === 0 && 
                   !guest.allergyText && 
                   guest.drinkPreferences.length === 0 && (
                    <p className="text-sm text-muted-foreground italic">
                      Гость не указал предпочтения
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}