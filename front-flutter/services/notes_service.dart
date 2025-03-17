import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class NotesService with ChangeNotifier {
  List<Map<String, dynamic>> _notes = [];
  List<Map<String, dynamic>> get notes => _notes;

  final String _baseUrl = 'http://back-nest:3000/notes';

  /// Método para obtener el token desde SharedPreferences
  Future<String?> _getToken() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString("token");
  }

  /// Obtener las notas del backend
  Future<void> fetchNotes() async {
    String? token = await _getToken();
    if (token == null) return;

    final response = await http.get(
      Uri.parse(_baseUrl),
      headers: {"Authorization": "Bearer $token"},
    );

    if (response.statusCode == 200) {
      _notes = List<Map<String, dynamic>>.from(jsonDecode(response.body));
      notifyListeners();
    } else {
      print("Error al obtener notas: ${response.statusCode}");
    }
  }

  /// Agregar una nueva nota al backend
  Future<void> addNote(String title, String content) async {
    String? token = await _getToken();
    if (token == null) return;

    final response = await http.post(
      Uri.parse(_baseUrl),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer $token"
      },
      body: jsonEncode({"title": title, "content": content}),
    );

    if (response.statusCode == 201) {
      fetchNotes(); // Actualizar lista de notas después de agregar
    } else {
      print("Error al agregar nota: ${response.statusCode}");
    }
  }

  /// Eliminar una nota por su ID
  Future<void> removeNote(int id) async {
    String? token = await _getToken();
    if (token == null) return;

    final response = await http.delete(
      Uri.parse("$_baseUrl/$id"),
      headers: {"Authorization": "Bearer $token"},
    );

    if (response.statusCode == 200) {
      _notes.removeWhere((note) => note["id"] == id);
      notifyListeners();
    } else {
      print("Error al eliminar nota: ${response.statusCode}");
    }
  }
}
