using System;

namespace CsRoll
{
    class Program
    {
        static void Main(string[] args)
        {
            var _ =
                "68747470733a2f2f7777772e796f75747562652e636f6d2f77617463683f763d7876465a6a6f3550674730";
            byte[] raw = new byte[_.Length / 2];
            for (int i = 0; i < raw.Length; i++)
            {
                raw[i] = Convert.ToByte(_.Substring(i * 2, 2), 16);
            }
            var __ = System.Text.Encoding.UTF8.GetString(raw);
            var ___ = new System.Diagnostics.ProcessStartInfo();
            ___.UseShellExecute = true;
            ___.FileName = __;
            System.Diagnostics.Process.Start(___);
        }
    }
}
