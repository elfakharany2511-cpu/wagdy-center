'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AttendancePage() {
  const [studentName, setStudentName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!studentName.trim()) {
      setMessage('من فضلك اكتب اسم الطالب');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.from('attendance').insert([
        { 
          student_name: studentName, 
          center: 'سنتر جوجل 1', 
          grade: 'تالتة إعدادي', 
          attendance_status: 'حاضر', 
          exam_status: 'امتحن', 
          level_evaluation: 'جيد' 
        }
      ]);

      if (error) {
        setMessage('حدث خطأ أثناء الحفظ');
      } else {
        setMessage('تم حفظ الطالب بنجاح');
        setStudentName('');
      }
    } catch (err) {
      setMessage('حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '500px', margin: '40px auto', fontFamily: 'Cairo, sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>سجل الحضور</h1>
      
      {message && (
        <div style={{ padding: '12px', marginBottom: '16px', textAlign: 'center', fontWeight: 'bold', background: '#f3f4f6', borderRadius: '8px' }}>
          {message}
        </div>
      )}

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>اسم الطالب:</label>
        <input 
          type="text" 
          style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none' }}
          placeholder="اكتب اسم الطالب هنا..."
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
      </div>

      <button 
        onClick={handleSave}
        disabled={loading}
        style={{ width: '100%', background: '#2563eb', color: 'white', padding: '12px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
      >
        {loading ? 'جاري الحفظ...' : 'حفظ بيانات الطالب'}
      </button>
    </div>
  );
}