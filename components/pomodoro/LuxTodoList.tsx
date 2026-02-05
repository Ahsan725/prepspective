'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import canvasConfetti from 'canvas-confetti';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

const LuxTodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [input, setInput] = useState('');

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
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('pomodoro-todos', JSON.stringify(todos));
  }, [todos]);

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
                origin: { x: 0.8, y: 0.5 }, // Adjust origin for right column
                colors: ['#4f46e5', '#818cf8', '#c7d2fe'] // Indigo scale
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
            <Sparkles className="w-5 h-5 text-indigo-500" />
            Task
        </h3>
        <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded-md">{todos.filter(t => !t.completed).length} Pending</span>
      </div>

      <ul className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence initial={false} mode='popLayout'>
          {todos.map((todo) => (
            <motion.li
              key={todo.id}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="group flex items-center gap-3 py-2 border-b border-zinc-800/50 last:border-0"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={cn(
                  "flex-shrink-0 w-6 h-6 rounded-lg border-2 transition-all duration-300 flex items-center justify-center",
                  todo.completed 
                    ? "bg-indigo-600 border-indigo-600" 
                    : "border-zinc-700 bg-zinc-800/50 hover:border-indigo-500 hover:bg-zinc-800"
                )}
              >
                {todo.completed && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
              </button>
              
              <span 
                className={cn(
                    "flex-1 text-sm font-medium transition-all duration-300",
                    todo.completed ? "text-zinc-500 line-through" : "text-zinc-200"
                )}
              >
                {todo.text}
              </span>

              <button
                onClick={() => removeTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-400 transition-opacity p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
        
        {todos.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 text-zinc-600 text-sm">
                <p>No tasks yet.</p>
                <p>Add one below to focus!</p>
            </div>
        )}
      </ul>

      {/* Input at bottom */}
      <form onSubmit={addTodo} className="mt-6 relative">
         <div className="relative">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a new focus task..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none pr-10"
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
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(82, 82, 91, 0.5);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default LuxTodoList;
