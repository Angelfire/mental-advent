import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const CalendarioAdviento = () => {
  const [diaAbierto, setDiaAbierto] = useState(null);
  
  const actividades = [
    {
      dia: 1,
      titulo: "Gratitud",
      descripcion: "Escribe 3 cosas por las que estés agradecido/a hoy. La gratitud nos ayuda a enfocarnos en lo positivo."
    },
    {
      dia: 2,
      titulo: "Mindfulness",
      descripcion: "Toma 5 minutos para hacer un ejercicio de respiración consciente. Observa cómo entra y sale el aire."
    },
    {
      dia: 3,
      titulo: "Conexión",
      descripcion: "Llama a un ser querido solo para preguntarle cómo está. Las conexiones sociales son fundamentales."
    },
    {
      dia: 4,
      titulo: "Autocompasión",
      descripcion: "Escribe una carta amable a ti mismo/a, como si le escribieras a un amigo que necesita apoyo."
    },
    {
      dia: 5,
      titulo: "Movimiento",
      descripcion: "Baila tu canción favorita. El movimiento libera endorfinas y mejora el estado de ánimo."
    },
    {
      dia: 6,
      titulo: "Límites Saludables",
      descripcion: "Practica decir 'no' a algo que realmente no quieres hacer. Los límites son importantes."
    },
    {
      dia: 7,
      titulo: "Creatividad",
      descripcion: "Dedica 15 minutos a una actividad creativa sin juzgar el resultado."
    },
    {
      dia: 8,
      titulo: "Naturaleza",
      descripcion: "Da un paseo consciente, observando los detalles del entorno natural."
    },
    {
      dia: 9,
      titulo: "Valores",
      descripcion: "Reflexiona sobre tus valores principales. ¿Qué es lo más importante para ti?"
    },
    {
      dia: 10,
      titulo: "Desconexión",
      descripcion: "Toma un descanso de 2 horas de las redes sociales. Observa cómo te sientes."
    },
    {
      dia: 11,
      titulo: "Autocuidado",
      descripcion: "Haz algo específicamente para cuidar de ti mismo/a hoy."
    },
    {
      dia: 12,
      titulo: "Perdón",
      descripcion: "Reflexiona sobre algo que necesites perdonarte a ti mismo/a."
    },
    {
      dia: 13,
      titulo: "Propósito",
      descripcion: "Escribe sobre algo que te da sentido y propósito en la vida."
    },
    {
      dia: 14,
      titulo: "Emociones",
      descripcion: "Identifica y nombra tus emociones sin juzgarlas."
    },
    {
      dia: 15,
      titulo: "Compasión",
      descripcion: "Realiza un acto de bondad aleatorio para alguien más."
    },
    {
      dia: 16,
      titulo: "Resiliencia",
      descripcion: "Recuerda un momento difícil que superaste. ¿Qué aprendiste?"
    },
    {
      dia: 17,
      titulo: "Curiosidad",
      descripcion: "Aprende algo nuevo hoy, por pequeño que sea."
    },
    {
      dia: 18,
      titulo: "Cuerpo",
      descripcion: "Realiza un escaneo corporal de 10 minutos, notando tensiones y sensaciones."
    },
    {
      dia: 19,
      titulo: "Optimismo",
      descripcion: "Visualiza algo positivo que esperas que suceda en el futuro."
    },
    {
      dia: 20,
      titulo: "Paz Interior",
      descripcion: "Encuentra un momento de silencio completo por 5 minutos."
    },
    {
      dia: 21,
      titulo: "Fortalezas",
      descripcion: "Enumera tus principales fortalezas y cómo las has usado recientemente."
    },
    {
      dia: 22,
      titulo: "Aceptación",
      descripcion: "Practica aceptar algo que no puedes cambiar en este momento."
    },
    {
      dia: 23,
      titulo: "Alegría",
      descripcion: "Haz algo que te haga reír o sonreír genuinamente."
    },
    {
      dia: 24,
      titulo: "Reflexión",
      descripcion: "Reflexiona sobre tu crecimiento personal durante este mes."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-5xl leading-snug font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
        Calendario de Adviento Psicológico
      </h1>

      <p className="my-8 text-lg">Mental Advent - Un calendario de adviento digital que transforma la cuenta regresiva navideña en un viaje de bienestar mental. Cada día revela una actividad psicológica cuidadosamente diseñada, combinando prácticas de mindfulness, gratitud y desarrollo personal. Una manera única de practicar el autocuidado durante las fiestas mientras cuentas los días hasta Navidad.</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {actividades.map((actividad) => (
          <Card 
            key={actividad.dia}
            className={`
              cursor-pointer
              transition-all duration-300
              transform hover:scale-105
              hover:shadow-lg
              ${diaAbierto?.dia === actividad.dia ? 'ring-2 ring-purple-500' : ''}
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
                <div className="text-2xl font-bold text-gray-800">{actividad.dia}</div>
                {diaAbierto?.dia === actividad.dia && (
                  <div className="text-sm leading-tight font-medium text-gray-600">{actividad.titulo}</div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {diaAbierto && (
        <Alert className="mt-8 bg-white shadow-lg border-l-4 border-purple-500">
          <AlertTitle className="text-xl font-bold text-purple-700">
            Día {diaAbierto.dia}: {diaAbierto.titulo}
          </AlertTitle>
          <AlertDescription className="mt-3 text-gray-700 leading-relaxed text-base">
            {diaAbierto.descripcion}
          </AlertDescription>
          <Button 
            className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white transition-all duration-300"
            onClick={() => setDiaAbierto(null)}
          >
            Cerrar
          </Button>
        </Alert>
      )}
    </div>
  );
};

export default CalendarioAdviento;