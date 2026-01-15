import 'package:flutter/material.dart';

class PrimeWaterPage extends StatelessWidget {
  const PrimeWaterPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: Container(
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: const Color(0xFFE63946),
          ),
          child: IconButton(
            icon: const Icon(Icons.arrow_back, color: Colors.white),
            onPressed: () => Navigator.pop(context),
          ),
        ),
        title: const Text('PRIME WATER', style: TextStyle(color: Color(0xFFE63946), fontWeight: FontWeight.bold, fontSize: 18)),
        centerTitle: true,
        backgroundColor: Colors.white,
        elevation: 0,
      ),
      body: const WaterSourceBody(),
    );
  }
}

class WaterSourceBody extends StatelessWidget {
  const WaterSourceBody({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 0, vertical: 0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Reading Section - Light Blue Background
          Container(
            color: const Color(0xFFCCE5FF),
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 18),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Reading:', style: TextStyle(fontWeight: FontWeight.w600, color: Color(0xFFE63946), fontSize: 16)),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        keyboardType: const TextInputType.numberWithOptions(decimal: true),
                        decoration: InputDecoration(
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                            borderSide: const BorderSide(color: Colors.grey),
                          ),
                          isDense: true,
                          contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 14),
                          filled: true,
                          fillColor: Colors.white,
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    const Text('m³', style: TextStyle(fontSize: 14)),
                  ],
                ),
              ],
            ),
          ),
          
          // Photo Section - Pink Background
          Container(
            color: const Color(0xFFFFCCD5),
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 18),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Photo:', style: TextStyle(fontWeight: FontWeight.w600, color: Color(0xFFE63946), fontSize: 16)),
                const SizedBox(height: 12),
                Center(
                  child: Container(
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: const Color(0xFFE63946),
                    ),
                    child: IconButton(
                      iconSize: 36,
                      icon: const Icon(Icons.cloud_upload_outlined, color: Colors.white),
                      onPressed: () {
                        // TODO: implement image picker
                      },
                    ),
                  ),
                ),
              ],
            ),
          ),
          
          // Remarks Section - Light Pink Background
          Container(
            color: const Color(0xFFFFEAED),
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 18),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Remarks:', style: TextStyle(fontWeight: FontWeight.w600, color: Color(0xFFE63946), fontSize: 16)),
                const SizedBox(height: 12),
                TextField(
                  minLines: 5,
                  maxLines: 8,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: const BorderSide(color: Colors.grey),
                    ),
                    hintText: 'Enter remarks',
                    isDense: true,
                    contentPadding: const EdgeInsets.all(12),
                    filled: true,
                    fillColor: Colors.white,
                  ),
                ),
              ],
            ),
          ),
          
          // Submit Button Section
          Container(
            color: const Color(0xFFFFEAED),
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 18),
            width: double.infinity,
            child: Center(
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFE63946),
                  padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 14),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Submitted (demo)')),
                  );
                },
                child: const Text('Submit', style: TextStyle(color: Colors.white, fontSize: 16)),
              ),
            ),
          ),
        ],
      ),
    );
  }
}