using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace EmployeeRequest.BaseClasses
{
    public class AesEncryptDecryptor
    {
        #region Properties

        private static readonly byte[] Keybytes = Encoding.UTF8.GetBytes("8080808080808080");
        private static readonly byte[] Iv = Encoding.UTF8.GetBytes("8080808080808080");

        private static readonly byte[] KeybytesV2 = Encoding.UTF8.GetBytes("9191919191919191");
        private static readonly byte[] IvV2 = Encoding.UTF8.GetBytes("9191919191919191");

        #endregion

        #region Public Methods

        public static string Encrypt(string cipherText)
        {
            var encryptedString = EncryptStringToBytes(cipherText, Keybytes, Iv);
            var base64Str = Convert.ToBase64String(encryptedString);
            return base64Str;
        }

        public static string Decrypt(string cipherText)
        {
            var encrypted = Convert.FromBase64String(cipherText);
            var decriptedFromJavascript = DecryptFromBytes(encrypted, Keybytes, Iv);
            return string.Format(decriptedFromJavascript);
        }

        public static string DecryptV2(string cipherText)
        {
            var encrypted = Convert.FromBase64String(cipherText);
            var decriptedFromJavascript = DecryptFromBytes(encrypted, KeybytesV2, IvV2);
            return string.Format(decriptedFromJavascript);
        }

        #endregion

        #region Private Methods

        private static string DecryptFromBytes(byte[] cipherText, byte[] key, byte[] iv)
        {
            // Check arguments.  
            if (cipherText == null || cipherText.Length <= 0)
                throw new ArgumentNullException(nameof(cipherText));

            if (key == null || key.Length <= 0)
                throw new ArgumentNullException(nameof(key));

            if (iv == null || iv.Length <= 0)
                throw new ArgumentNullException(nameof(key));


            // Declare the string used to hold  
            // the decrypted text.  
            string plaintext;

            // Create an RijndaelManaged object  
            // with the specified key and IV.  
            using (var rijAlg = new RijndaelManaged())
            {
                //Settings  
                rijAlg.Mode = CipherMode.CBC;
                rijAlg.Padding = PaddingMode.PKCS7;
                rijAlg.FeedbackSize = 128;

                rijAlg.Key = key;
                rijAlg.IV = iv;

                // Create a decrytor to perform the stream transform.  
                var decryptor = rijAlg.CreateDecryptor(rijAlg.Key, rijAlg.IV);

                try
                {
                    // Create the streams used for decryption.  
                    using (var msDecrypt = new MemoryStream(cipherText))
                    {
                        using (var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                        {

                            using (var srDecrypt = new StreamReader(csDecrypt))
                            {
                                // Read the decrypted bytes from the decrypting stream  
                                // and place them in a string.  
                                plaintext = srDecrypt.ReadToEnd();
                            }
                        }
                    }
                }
                catch
                {
                    plaintext = "keyError";
                }
            }

            return plaintext;
        }

        private static byte[] EncryptStringToBytes(string plainText, byte[] key, byte[] iv)
        {
            // Check arguments.  
            if (plainText == null || plainText.Length <= 0)
            {
                throw new ArgumentNullException(nameof(plainText));
            }
            if (key == null || key.Length <= 0)
            {
                throw new ArgumentNullException(nameof(key));
            }
            if (iv == null || iv.Length <= 0)
            {
                throw new ArgumentNullException(nameof(key));
            }
            byte[] encrypted;
            // Create a RijndaelManaged object  
            // with the specified key and IV.  
            using (var rijAlg = new RijndaelManaged())
            {
                rijAlg.Mode = CipherMode.CBC;
                rijAlg.Padding = PaddingMode.PKCS7;
                rijAlg.FeedbackSize = 128;

                rijAlg.Key = key;
                rijAlg.IV = iv;

                // Create a decrytor to perform the stream transform.  
                var encryptor = rijAlg.CreateEncryptor(rijAlg.Key, rijAlg.IV);

                // Create the streams used for encryption.  
                using (var msEncrypt = new MemoryStream())
                {
                    using (var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                    {
                        using (var swEncrypt = new StreamWriter(csEncrypt))
                        {
                            //Write all data to the stream.  
                            swEncrypt.Write(plainText);
                        }
                        encrypted = msEncrypt.ToArray();
                    }
                }
            }

            // Return the encrypted bytes from the memory stream.  
            return encrypted;

        }

        #endregion
    }
}

