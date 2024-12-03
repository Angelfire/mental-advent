import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

import { activities } from '@/data/activities';

const CalendarioAdviento = () => {
  const [diaAbierto, setDiaAbierto] = useState(null);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-5xl leading-snug font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
        Calendario de Adviento Psicológico
      </h1>

      <p className="my-8 text-lg">Mental Advent - Un calendario de adviento digital que transforma la cuenta regresiva navideña en un viaje de bienestar mental. Cada día revela una actividad psicológica cuidadosamente diseñada, combinando prácticas de mindfulness, gratitud y desarrollo personal. Una manera única de practicar el autocuidado durante las fiestas mientras cuentas los días hasta Navidad.</p>
      
      {diaAbierto && (
        <Alert className="my-8 bg-white shadow-lg border-l-4 border-purple-500">
          <AlertTitle className="text-xl font-bold text-purple-700">
            Día {diaAbierto.day}: {diaAbierto.title}
          </AlertTitle>
          <AlertDescription className="mt-3 text-gray-700 leading-relaxed text-base">
            {diaAbierto.description}
          </AlertDescription>
          <Button 
            className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white transition-all duration-300"
            onClick={() => setDiaAbierto(null)}
          >
            Cerrar
          </Button>
        </Alert>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {activities.map((actividad) => (
          <Card 
            key={actividad.day}
            className={`
              cursor-pointer
              transition-all duration-300
              transform hover:scale-105
              hover:shadow-lg
              ${diaAbierto?.day === actividad.day ? 'ring-2 ring-purple-500' : ''}
            `}
            onClick={() => setDiaAbierto(actividad)}
          >
            <CardContent className="
              p-4 
              text-center
              rounded-lg
              min-h-32
              flex items-center justify-center
            ">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-800">{actividad.day}</div>
                {diaAbierto?.day === actividad.day && (
                  <div className="text-sm leading-tight font-medium text-gray-600">{actividad.title}</div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CalendarioAdviento;