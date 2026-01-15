import 'package:flutter/material.dart';
import 'login_screen.dart';

void main() => runApp(const CampusFlowLoginApp());

class CampusFlowLoginApp extends StatelessWidget {
  const CampusFlowLoginApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CampusFlow - Login',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        fontFamily: 'Poppins',
        primarySwatch: Colors.green,
      ),
      home: const LoginScreen(),
    );
  }
}