import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:tarea/services/notes_service.dart';

class NotesScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Notas")),
      body: Consumer<NotesService>(
        builder: (context, notesService, _) {
          return notesService.notes.isEmpty
              ? Center(
                  child: Text(
                    "No hay notas aún. ¡Agrega una!",
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
                  ),
                )
              : ListView.builder(
                  itemCount: notesService.notes.length,
                  itemBuilder: (context, index) {
                    final note = notesService.notes[index];
                    return Card(
                      margin: EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      child: ListTile(
                        title: Text(note["title"], style: TextStyle(fontWeight: FontWeight.bold)),
                        subtitle: Text(note["content"]),
                        trailing: IconButton(
                          icon: Icon(Icons.delete, color: Colors.red),
                          onPressed: () {
                            Provider.of<NotesService>(context, listen: false).removeNote(index);
                          },
                        ),
                      ),
                    );
                  },
                );
        },
      ),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        onPressed: () => _showAddNoteDialog(context),
      ),
    );
  }

  void _showAddNoteDialog(BuildContext context) {
    final titleController = TextEditingController();
    final contentController = TextEditingController();

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text("Agregar Nota"),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: titleController,
                decoration: InputDecoration(labelText: "Título"),
              ),
              TextField(
                controller: contentController,
                decoration: InputDecoration(labelText: "Contenido"),
              ),
            ],
          ),
          actions: [
            TextButton(
              child: Text("Cancelar"),
              onPressed: () => Navigator.of(context).pop(),
            ),
            ElevatedButton(
              child: Text("Guardar"),
              onPressed: () {
                final title = titleController.text.trim();
                final content = contentController.text.trim();
                if (title.isNotEmpty && content.isNotEmpty) {
                  Provider.of<NotesService>(context, listen: false).addNote(title, content);
                  Navigator.of(context).pop();
                }
              },
            ),
          ],
        );
      },
    );
  }
}
