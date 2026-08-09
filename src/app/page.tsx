import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">نظام إدارة سنتر الدروس</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/students" className="bg-blue-600 text-white p-6 rounded-2xl text-xl font-bold">
          إدارة الطلاب
        </Link>
        <Link href="/attendance" className="bg-green-600 text-white p-6 rounded-2xl text-xl font-bold">
          تسجيل الحضور
        </Link>
      </div>
    </div>
  );
}