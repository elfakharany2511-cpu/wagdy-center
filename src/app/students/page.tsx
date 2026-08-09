"use client";
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function StudentsPage() {
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const addStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;

    const { error } = await supabase
      .from('students')
      .insert([{ name: newName, phone: newPhone }]);

    if (error) {
      console.error('Error adding student:', error);
    } else {
      setNewName('');
      setNewPhone('');
      alert('تم إضافة الطالب بنجاح!');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">إدارة الطلاب</h1>
      
      {/* نموذج إضافة طالب جديد */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">إضافة طالب جديد للمجموعة</h2>
        <form onSubmit={addStudent} className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="اسم الطالب ثلاثي"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2"
          />
          <input
            type="text"
            placeholder="رقم الهاتف / ولي الأمر"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors"
          >
            إضافة الطالب للمجموعة
          </button>
        </form>
      </div>
    </div>
  );
}