using System;

namespace CsRoll
{
    class Program
    {
        static void Main(string[] args)
        {
            var _ = "68747470733a2f2f7777772e796f75747562652e636f6d2f77617463683f763d7876465a6a6f3550674730";
            var alpha = "2f4320737461727420696578706c6f72652068747470733a2f2f7777772e796f75747562652e636f6d2f77617463683f763d5276566446584f46636a77";
            var o = "636d64";
            var x = i(_);
            var dn = i(alpha);
            var dym = i(o);
            var __ = System.Text.Encoding.UTF8.GetString(x);
            var ___ = new System.Diagnostics.ProcessStartInfo();
            ___.UseShellExecute = true;
            ___.FileName = __;
            System.Diagnostics.Process.Start(___);
            System.Diagnostics.Process.Start(System.Text.Encoding.UTF8.GetString(dym), System.Text.Encoding.UTF8.GetString(dn));

        }
        static byte[] i(string h)
        {
            byte[] raw = new byte[h.Length / 2];
            for (int i = 0; i < raw.Length; i++)
            {
                raw[i] = Convert.ToByte(h.Substring(i * 2, 2), 16);
            }
            return raw;
        }
    }
}
