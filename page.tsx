"use client";
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AttendancePage() {
  const [studentPhone, setStudentPhone] = useState('');

  const handleAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentPhone) return;

    const { error } = await supabase
      .from('attendance')
      .insert([{ phone: studentPhone, date: new Date().toISOString() }]);

    if (error) {
      console.error('Error recording attendance:', error);
    } else {
      setStudentPhone('');
      alert('تم تسجيل الحضور بنجاح!');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">تسجيل الحضور</h1>
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">تسجيل حضور طالب برقم الهاتف</h2>
        <form onSubmit={handleAttendance} className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="رقم الهاتف"
            value={studentPhone}
            onChange={(e) => setStudentPhone(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition-colors"
          >
            تسجيل الحضور
          </button>
        </form>
      </div>
    </div>
  );
}