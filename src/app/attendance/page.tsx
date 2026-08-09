'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AttendancePage() {
  const [studentName, setStudentName] = useState('');
  const [center, setCenter] = useState('سنتر جوجل 1');
  const [grade, setGrade] = useState('تالتة إعدادي');
  const [attendance, setAttendance] = useState('حاضر');
  const [message, setMessage] = useState('');

  // دي الدالة اللي بتشتغل لما تدوس على زرار الحفظ
  const handleSave = async () => {
    if (!studentName) {
      setMessage('⚠️ من فضلك اكتب اسم الطالب أولاً');
      return;
    }

    // أمر الإرسال لقاعدة البيانات
    const { error } = await supabase.from('attendance').insert([
      { 
        student_name: studentName, 
        center: center, 
        grade: grade, 
        attendance_status: attendance, 
        exam_status: 'امتحن', 
        level_evaluation: 'جيد' 
      }
    ]);

    if (error) {
      setMessage('❌ حصل خطأ أثناء الحفظ');
      console.error(error);
    } else {
      setMessage('✅ تم حفظ الطالب بنجاح!');
      setStudentName(''); // مسح خانة الاسم استعداداً للطالب اللي بعده
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">سجل الحضور</h1>
      
      {message && (
        <div className="p-3 mb-4 text-center font-bold rounded bg-gray-100">
          {message}
        </div>
      )}

      {/* خانة كتابة اسم الطالب */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">اسم الطالب:</label>
        <input 
          type="text" 
          className="w-full p-3 border rounded-lg"
          placeholder="اكتب اسم الطالب هنا..."
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
      </div>

      {/* زرار الحفظ */}
      <button 
        onClick={handleSave}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-bold transition-all"
      >
        حفظ بيانات الطالب
      </button>
    </div>
  );
}