import  Button  from "../components/ui/button";
import { Card, CardContent,  } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";


const NewLesson = () => {
  const weeks = Array.from({ length: 7 }, (_, i) => i + 1);
  const sentences = Array.from({ length: 7 }, (_, i) => i + 1);

  return (
    <main className="w-full h-full">
      <Card className="w-full mx-auto bg-black text-white border-none">
      
      <CardContent className="space-y-6 p-4">
        <Tabs defaultValue="3" className="w-full">
          <TabsList className="w-full bg-transparent border rounded-full p-1 h-auto">
            {weeks.map((week) => (
              <TabsTrigger
                key={week}
                value={week.toString()}
                className="rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                {week}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="space-y-3">
          {sentences.map((index) => (
            <Input
              key={index}
              placeholder={`Sentence ${index}...`}
              className="bg-transparent border-gray-700 rounded-lg text-white placeholder:text-gray-400"
            />
          ))}
        </div>
        <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg">
          Create New Lesson
        </Button>
      </CardContent>
    </Card>
    </main>
  );
};

export default NewLesson;
