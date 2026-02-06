'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Check, ListTodo, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import canvasConfetti from 'canvas-confetti';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

interface SortableTodoItemProps {
  todo: TodoItem;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
}

const SortableTodoItem = ({ todo, toggleTodo, removeTodo }: SortableTodoItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    position: isDragging ? "relative" : "relative",
  } as React.CSSProperties;

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={cn(
        "group flex items-center gap-3 py-3 border-b border-zinc-800/50 last:border-0 bg-zinc-900", // Increased padding
        isDragging && "opacity-50 shadow-xl ring-1 ring-indigo-500/50 rounded-lg z-50 bg-zinc-800"
      )}
    >
      {/* Drag Handle */}
      <button 
        {...attributes} 
        {...listeners} 
        className="text-zinc-600 hover:text-zinc-400 cursor-grab active:cursor-grabbing p-1 touch-none"
      >
        <GripVertical className="w-5 h-5" />
      </button>

      <button
        onClick={() => toggleTodo(todo.id)}
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full border-2 transition-all duration-300 flex items-center justify-center", 
          todo.completed 
            ? "bg-indigo-600 border-indigo-600" 
            : "border-zinc-700 bg-zinc-800/50 hover:border-indigo-500 hover:bg-zinc-800"
        )}
      >
        {todo.completed && <Check className="w-5 h-5 text-white" strokeWidth={3} />}
      </button>
      
      <span 
        className={cn(
            "flex-1 text-lg font-medium transition-all duration-300", // Increased text size to text-lg
            todo.completed ? "text-zinc-500 line-through" : "text-zinc-200"
        )}
      >
        {todo.text}
      </span>

      <button
        onClick={() => removeTodo(todo.id)}
        className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-400 transition-opacity p-1"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </li>
  );
};

const LuxTodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [input, setInput] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('pomodoro-todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    } else {
        setTodos([
            { id: '1', text: 'Design', completed: false }, 
            { id: '2', text: 'Web development', completed: false },
            { id: '3', text: 'Social media content', completed: false }
        ]);
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (isLoaded) {
        localStorage.setItem('pomodoro-todos', JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addTodo = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: input.trim(),
      completed: false,
    };

    setTodos([newTodo, ...todos]);
    setInput('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => {
      if (t.id === id) {
        const check = !t.completed;
        if (check) {
            canvasConfetti({
                particleCount: 30,
                spread: 50,
                origin: { x: 0.8, y: 0.5 },
                colors: ['#4f46e5', '#818cf8', '#c7d2fe']
            });
        }
        return { ...t, completed: !t.completed };
      }
      return t;
    }));
  };

  const removeTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="bg-zinc-900 text-white rounded-[2rem] p-6 shadow-sm col-span-3 md:col-span-1 h-full min-h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
            <ListTodo className="w-5 h-5 text-indigo-500" />
          Task
        </h3>
        <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded-md">{todos.filter(t => !t.completed).length} Pending</span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <DndContext 
            sensors={sensors} 
            collisionDetection={closestCenter} 
            onDragEnd={handleDragEnd}
        >
            <SortableContext 
                items={todos} 
                strategy={verticalListSortingStrategy}
            >
                <ul className="space-y-1">
                    {todos.map((todo) => (
                        <SortableTodoItem 
                            key={todo.id} 
                            todo={todo} 
                            toggleTodo={toggleTodo} 
                            removeTodo={removeTodo} 
                        />
                    ))}
                </ul>
            </SortableContext>
        </DndContext>
        
        {todos.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 text-zinc-600 text-sm">
                <p>No tasks yet.</p>
                <p>Add one below to focus!</p>
            </div>
        )}
      </div>

      {/* Input at bottom */}
      <form onSubmit={addTodo} className="mt-6 relative">
         <div className="relative">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a new focus task..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-base text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none pr-10"
            />
            <button 
                type="submit"
                disabled={!input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-500 disabled:opacity-0 disabled:pointer-events-none transition-all"
            >
                <Plus className="w-5 h-5" />
            </button>
         </div>
      </form>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(39, 39, 42, 0.5); /* Zinc-800/50 */
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6366f1; /* Indigo-500 */
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4f46e5; /* Indigo-600 */
        }
      `}</style>
    </div>
  );
};

export default LuxTodoList;
