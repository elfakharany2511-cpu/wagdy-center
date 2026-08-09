"use client";
import React, { useState } from "react";

export default function AttendancePage() {
  // قائمة تجريبية للطلاب (هنربطها بقاعدة البيانات لاحقاً)
  const [students, setStudents] = useState([
    { id: 1, name: "عبدالله محمد", status: "present" },
    { id: 2, name: "عمر أحمد", status: "present" },
    { id: 3, name: "يوسف محمود", status: "absent" },
    { id: 4, name: "إبراهيم خالد", status: "late" },
  ]);

  const handleStatusChange = (id: number, status: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, status } : s));
  };

  const markAllPresent = () => {
    setStudents(students.map(s => ({ ...s, status: "present" })));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-right" dir="rtl">
      {/* رأس الصفحة */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">سنتر جوجل 1</span>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">تسجيل حضور: ثالثة إعدادي (رياضيات)</h1>
          <p className="text-gray-500 text-sm mt-1">تاريخ الحصة: الأحد، 9 أغسطس 2026</p>
        </div>
        <button 
          onClick={markAllPresent}
          className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm"
        >
          ✅ تسجيل الكل حاضر
        </button>
      </div>

      {/* جدول الطلاب */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 flex justify-between">
          <span>إجمالي الطلاب: {students.length}</span>
          <span>خيارات الحضور والغياب</span>
        </div>

        <div className="divide-y divide-gray-100">
          {students.map((student) => (
            <div key={student.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-gray-50/50 transition-colors">
              <span className="font-bold text-gray-800 text-lg mb-3 sm:mb-0">{student.name}</span>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStatusChange(student.id, "present")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    student.status === "present" 
                      ? "bg-green-600 text-white shadow-sm" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  حاضر ✅
                </button>
                
                <button
                  onClick={() => handleStatusChange(student.id, "absent")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    student.status === "absent" 
                      ? "bg-red-600 text-white shadow-sm" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  غائب ❌
                </button>

                <button
                  onClick={() => handleStatusChange(student.id, "late")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    student.status === "late" 
                      ? "bg-amber-500 text-white shadow-sm" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  متأخر ⏰
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button 
            onClick={() => alert("تم حفظ بيانات الحضور بنجاح!")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md"
          >
            💾 حفظ الحضور في قاعدة البيانات
          </button>
        </div>
      </div>
    </div>
  );
}