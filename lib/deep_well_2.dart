import 'package:flutter/material.dart';
import 'prime_water.dart';

class DeepWell2Page extends StatelessWidget {
  const DeepWell2Page({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: BackButton(color: Colors.black),
        title: const Text('Deep Well 2', style: TextStyle(color: Colors.black)),
        centerTitle: true,
        backgroundColor: Colors.white,
        elevation: 0,
        iconTheme: const IconThemeData(color: Colors.black),
      ),
      body: const WaterSourceBody(),
    );
  }
}