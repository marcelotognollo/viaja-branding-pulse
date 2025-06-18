
import { useState } from "react";
import { Plus, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TimelineEvent {
  year: string;
  event: string;
}

interface TimelineInputProps {
  timeline: TimelineEvent[];
  onChange: (timeline: TimelineEvent[]) => void;
}

export function TimelineInput({ timeline, onChange }: TimelineInputProps) {
  const [newEvent, setNewEvent] = useState({ year: '', event: '' });

  const addEvent = () => {
    if (newEvent.year.trim() && newEvent.event.trim()) {
      const updatedTimeline = [...timeline, { ...newEvent }].sort((a, b) => a.year.localeCompare(b.year));
      onChange(updatedTimeline);
      setNewEvent({ year: '', event: '' });
    }
  };

  const removeEvent = (index: number) => {
    onChange(timeline.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <Label className="text-cyan-200 font-medium text-lg flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        Linha do Tempo da Marca
      </Label>
      
      {/* Add new event */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 rounded-lg bg-slate-800/30 border border-cyan-400/20">
        <Input
          placeholder="Ano"
          value={newEvent.year}
          onChange={(e) => setNewEvent(prev => ({ ...prev, year: e.target.value }))}
          className="sirius-input"
        />
        <Input
          placeholder="Evento marcante"
          value={newEvent.event}
          onChange={(e) => setNewEvent(prev => ({ ...prev, event: e.target.value }))}
          className="sirius-input md:col-span-2"
        />
        <Button onClick={addEvent} className="sirius-button">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar
        </Button>
      </div>

      {/* Timeline events */}
      <div className="space-y-3">
        {timeline.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center gap-4 p-4 rounded-lg bg-slate-900/40 border border-cyan-400/20"
          >
            <div className="w-16 text-center">
              <span className="text-cyan-300 font-bold text-lg">{item.year}</span>
            </div>
            <div className="flex-1">
              <p className="text-white">{item.event}</p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => removeEvent(index)}
              className="text-red-300 hover:text-red-200 hover:bg-red-500/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        
        {timeline.length === 0 && (
          <p className="text-slate-400 text-center py-8 italic">
            Nenhum evento adicionado ainda. Comece criando marcos importantes da sua marca.
          </p>
        )}
      </div>
    </div>
  );
}
