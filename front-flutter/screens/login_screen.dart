import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:tarea/services/auth_service.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Login")),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(controller: emailController, decoration: InputDecoration(labelText: "Email")),
            TextField(controller: passwordController, decoration: InputDecoration(labelText: "Password"), obscureText: true),
            ElevatedButton(
              onPressed: () async {
                final success = await Provider.of<AuthService>(context, listen: false)
                    .login(emailController.text, passwordController.text);
                if (success) {
                  Navigator.pushReplacementNamed(context, "/notes");
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Login failed")));
                }
              },
              child: Text("Login"),
            ),
          ],
        ),
      ),
    );
  }
}
