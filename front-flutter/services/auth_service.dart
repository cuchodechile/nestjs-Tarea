import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class AuthService with ChangeNotifier {
  String? _token;
  String? get token => _token;

  Future<bool> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('http:// back-nest:3000/auth/login'),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({"email": email, "password": password}),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      _token = data["access_token"];
      SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString("token", _token!);
      notifyListeners();
      return true;
    }
    return false;
  }

  Future<void> logout() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.remove("token");
    _token = null;
    notifyListeners();
  }
}
