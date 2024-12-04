import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Lock } from 'lucide-react';
import { activities } from '@/data/activities';

export const AdventCalendar = () => {
  const [openDay, setOpenDay] = useState(null);
  const [completedDays, setCompletedDays] = useState([]);

  // Load completed days from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('completedDays');
    if (saved) {
      setCompletedDays(JSON.parse(saved));
    }
  }, []);

  // Save completed days to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('completedDays', JSON.stringify(completedDays));
  }, [completedDays]);

  // Scroll to activity details when a day is opened
  useEffect(() => {
    if (openDay) {
      const alertElement = document.querySelector('#activity');
      if (alertElement) {
        const y = alertElement.getBoundingClientRect().top + window.scrollY - 40;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [openDay]);

  // Check if a day is available to be opened
  const isDayAvailable = (day) => {
    // Day 1 is always available
    if (day === 1) return true;
    
    // For any other day, all previous days must be completed
    for (let i = 1; i < day; i++) {
      if (!completedDays.includes(i)) return false;
    }
    return true;
  };

  const handleDayClick = (activity) => {
    if (isDayAvailable(activity.day)) {
      setOpenDay(activity);
    }
  };

  const toggleCompleted = (day, event) => {
    event.stopPropagation();
    setCompletedDays(prev => {
      if (prev.includes(day)) {
        // Only allow uncompleting if no later days are completed
        const hasLaterCompletedDays = prev.some(d => d > day);
        if (hasLaterCompletedDays) {
          alert("You need to uncomplete later days first!");
          return prev;
        }
        return prev.filter(d => d !== day);
      } else {
        return [...prev, day].sort((a, b) => a - b);
      }
    });
  };

  return (
    <>
      <div className="mb-8">
        <p className="text-lg mb-4">Mental Advent - Un calendario de adviento digital que transforma la cuenta regresiva navideña en un viaje de bienestar mental. Cada día revela una actividad psicológica cuidadosamente diseñada, combinando prácticas de mindfulness, gratitud y desarrollo personal. Una manera única de practicar el autocuidado durante las fiestas mientras cuentas los días hasta Navidad.</p>
        <p className="text-sm text-purple-600">Has completado {completedDays.length} de 24 actividades</p>
      </div>
      
      {openDay && (
        <Alert className="my-8 bg-white shadow-lg border-l-4 border-purple-500" id="activity">
          <AlertTitle className="text-xl font-bold text-purple-700 flex items-center justify-between">
            <span>Día {openDay.day}: {openDay.title}</span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2"
              onClick={(e) => toggleCompleted(openDay.day, e)}
            >
              {completedDays.includes(openDay.day) ? 'Marcar como pendiente' : 'Marcar como completado'}
            </Button>
          </AlertTitle>
          <AlertDescription className="mt-3 text-gray-700 leading-relaxed text-base">
            {openDay.description}
          </AlertDescription>
          <Button 
            className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white transition-all duration-300"
            onClick={() => setOpenDay(null)}
          >
            Cerrar
          </Button>
        </Alert>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {activities.map((activity) => {
          const isAvailable = isDayAvailable(activity.day);
          const isCompleted = completedDays.includes(activity.day);

          return (
            <Card 
              key={activity.day}
              className={`
                ${isAvailable ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-60'}
                transition-all duration-300
                transform
                hover:shadow-lg
                ${openDay?.day === activity.day ? 'ring-2 ring-purple-500' : ''}
                ${isCompleted ? 'bg-purple-50' : ''}
              `}
              onClick={() => handleDayClick(activity)}
            >
              <CardContent className="
                p-4 
                text-center
                rounded-lg
                min-h-32
                flex items-center justify-center
                relative
              ">
                {!isAvailable && (
                  <Lock className="absolute top-2 right-2 text-gray-400 h-5 w-5" />
                )}
                {isCompleted && (
                  <CheckCircle2 className="absolute top-2 right-2 text-purple-500 h-5 w-5" />
                )}
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-gray-800">{activity.day}</div>
                  {openDay?.day === activity.day && (
                    <div className="text-sm leading-tight font-medium text-gray-600">{activity.title}</div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
};