import 'package:flutter/material.dart';
import 'steerhub.dart';
import 'albert_einstein.dart';
import 'automotive.dart';
import 'cet.dart';
import 'rgr.dart';
import 'ssc.dart';
import 'fdc.dart';

class SubmeterPage extends StatelessWidget {
  const SubmeterPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: GestureDetector(
          onTap: () => Navigator.pop(context),
          child: Container(
            margin: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.redAccent,
              shape: BoxShape.circle,
            ),
            child: const Center(
              child: Icon(Icons.arrow_back, color: Colors.white, size: 24),
            ),
          ),
        ),
        title: const Text(
          'SUBMETER',
          style: TextStyle(
            color: Colors.redAccent,
            fontWeight: FontWeight.bold,
            letterSpacing: 1,
            fontSize: 22,
          ),
        ),
        centerTitle: true,
      ),
      body: Stack(
        children: [
          // Background
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                image: DecorationImage(
                  image: const AssetImage('assets/images/bsu.jpg'),
                  fit: BoxFit.cover,
                  colorFilter: ColorFilter.mode(
                    Colors.white.withOpacity(0.65),
                    BlendMode.modulate,
                  ),
                ),
              ),
            ),
          ),
          SafeArea(
            child: Column(
              children: [
                Container(
                  width: double.infinity,
                  height: 60,
                  color: Colors.white,
                  child: const Center(
                    child: Text(
                      'SELECT LOCATION',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        color: Colors.black87,
                      ),
                    ),
                  ),
                ),
                Expanded(
                  child: Center(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 18),
                      child: SingleChildScrollView(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            _LocationButton(label: 'STEERHUB', page: const SteerhubPage()),
                            const SizedBox(height: 18),
                            _LocationButton(label: 'ALBERT EINSTEIN', page: const AlbertEinsteinPage()),
                            const SizedBox(height: 18),
                            _LocationButton(label: 'AUTOMOTIVE', page: const AutomotivePage()),
                            const SizedBox(height: 18),
                            _LocationButton(label: 'CET', page: const CetPage()),
                            const SizedBox(height: 18),
                            _LocationButton(label: 'RGR', page: const RgrPage()),
                            const SizedBox(height: 18),
                            _LocationButton(label: 'SSC', page: const SscPage()),
                            const SizedBox(height: 18),
                            _LocationButton(label: 'FDC', page: const FdcPage()),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _LocationButton extends StatelessWidget {
  final String label;
  final Widget page;

  const _LocationButton({required this.label, required this.page, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 86,
      width: double.infinity,
      child: ElevatedButton(
        onPressed: () {
          Navigator.push(context, MaterialPageRoute(builder: (_) => page));
        },
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.redAccent,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(44),
          ),
          elevation: 10,
          shadowColor: Colors.black45,
          padding: const EdgeInsets.symmetric(horizontal: 20),
        ),
        child: Text(
          label,
          style: const TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.w900,
            color: Colors.white,
          ),
        ),
      ),
    );
  }
}