import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="wrapper space-y-8">
        {/* Test basic Tailwind */}
        <div className="bg-red-500 text-white p-4 rounded-lg">
          <h2 className="text-2xl font-bold">
            Basic Tailwind Test
          </h2>
          <p>
            If you see red background, basic Tailwind works!
          </p>
        </div>

        {/* Test custom colors */}
        <div className="grid grid-cols-3 gap-4">
          <div
            style={{
              backgroundColor: "var(--color-primary-900)",
            }}
            className="h-20 rounded-lg flex items-center justify-center text-white"
          >
            <span>Primary 900</span>
          </div>
          <div
            style={{
              backgroundColor: "var(--color-secondary-500)",
            }}
            className="h-20 rounded-lg flex items-center justify-center text-white"
          >
            <span>Secondary 500</span>
          </div>
          <div
            style={{
              backgroundColor: "var(--color-accent-500)",
            }}
            className="h-20 rounded-lg flex items-center justify-center text-white"
          >
            <span>Accent 500</span>
          </div>
        </div>

        {/* Test custom typography */}
        <div className="card">
          <h1 className="h1-bold mb-4">H1 Bold Heading</h1>
          <h2 className="h2-medium mb-4">
            H2 Medium Heading
          </h2>
          <p className="body-large mb-2">
            Large body text with Inter font
          </p>
          <p className="body-medium">
            Medium body text for regular content
          </p>
        </div>

        {/* Test buttons */}
        <div className="flex gap-4">
          <button className="btn btn-primary">
            Primary Button
          </button>
          <button className="btn btn-secondary">
            Secondary Button
          </button>
          <button className="btn btn-accent">
            Accent Button
          </button>
          <button className="btn btn-outline">
            Outline Button
          </button>
        </div>

        {/* Test RTL */}
        <div dir="rtl" className="card">
          <h3 className="h3-bold mb-4 font-arabic">
            اختبار النص العربي
          </h3>
          <p className="body-medium font-arabic">
            هذا نص تجريبي باللغة العربية لاختبار الخطوط
            والاتجاه
          </p>
        </div>
      </div>
    </div>
  );
}
