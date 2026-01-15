import 'package:flutter/material.dart';

class AutomotivePage extends StatefulWidget {
  const AutomotivePage({Key? key}) : super(key: key);

  @override
  State<AutomotivePage> createState() => _AutomotivePageState();
}

class _AutomotivePageState extends State<AutomotivePage> {
  final TextEditingController _readingController = TextEditingController();
  final TextEditingController _remarksController = TextEditingController();

  void _pickPhoto() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Pick photo (not implemented)')),
    );
  }

  void _submit() {
    final reading = _readingController.text.trim();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('AUTOMOTIVE submitted: $reading kWh')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return _buildForm('AUTOMOTIVE');
  }

  Widget _buildForm(String title) {
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
        title: Text(title, style: const TextStyle(color: Color(0xFFE63946), fontWeight: FontWeight.bold, fontSize: 18)),
        centerTitle: true,
        backgroundColor: Colors.white,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 0, vertical: 0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Reading Section - Light Blue Background
            Container(
              color: const Color(0xFFCCE5FF),
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 18),
              width: double.infinity,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Reading:', style: TextStyle(fontWeight: FontWeight.w600, color: Color(0xFFE63946), fontSize: 16)),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(
                        child: TextField(
                          controller: _readingController,
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
                      const Text('kWh', style: TextStyle(fontSize: 14)),
                    ],
                  ),
                ],
              ),
            ),
            
            // Photo Section - Pink Background
            Container(
              color: const Color(0xFFFFCCD5),
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 18),
              width: double.infinity,
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
                        onPressed: _pickPhoto,
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
              width: double.infinity,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Remarks:', style: TextStyle(fontWeight: FontWeight.w600, color: Color(0xFFE63946), fontSize: 16)),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _remarksController,
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
                  onPressed: _submit,
                  child: const Text('Submit', style: TextStyle(color: Colors.white, fontSize: 16)),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}