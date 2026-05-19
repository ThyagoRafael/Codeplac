package codeplac.codeplac.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import codeplac.codeplac.DTO.RequestsDTO.Auth.LoginRequest;
import codeplac.codeplac.DTO.ResponsesDTO.Auth.LoginResponse;
import codeplac.codeplac.Exception.Excecao;
import codeplac.codeplac.Service.AuthService;
import codeplac.codeplac.Service.PasswordResetService;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired
  private AuthService authService;
  @Autowired
  private PasswordResetService passwordResetService;

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    try {
      if (loginRequest.getCpf() == null || loginRequest.getPassword() == null) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Dados incompletos!"));
      }

      // Autentica no Service
      Map<String, String> userData = authService.authenticate(loginRequest.getCpf(), loginRequest.getPassword());

      // Validação de Segurança: Checa se o usuário logado tem o cargo solicitado
      String tipoReal = userData.get("tipoUsuario");
      String tipoSolicitado = loginRequest.getTipo(); // Certifique-se que o DTO LoginRequest tenha o campo 'tipo'

      if ("ADMIN".equals(tipoSolicitado) && !"ADMIN".equals(tipoReal)) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
            .body(Map.of("message", "Acesso negado: Você não é administrador!"));
      }

      return ResponseEntity.ok(new LoginResponse(
          loginRequest.getCpf(),
          userData.get("token"),
          tipoReal));

    } catch (Excecao e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", e.getMessage()));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Erro fatal no servidor."));
    }
  }

  @PostMapping("/forgot-password")
  public ResponseEntity<Void> forgotPassword(@RequestBody Map<String, String> request) {

    String cpf = request.get("cpf");

    try {

      String appUrl = "https://www.codeplac.com.br";

      passwordResetService.createPasswordResetToken(cpf, appUrl);

      return ResponseEntity.ok().build();

    } catch (Excecao e) {

      throw new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          e.getMessage(),
          e);

    } catch (MailException e) {

      throw new ResponseStatusException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Erro ao enviar e-mail. Verifique as configurações.",
          e);
    }
  }

  @PostMapping("/reset-password")
  public ResponseEntity<Void> resetPassword(
      @RequestParam("token") String token,
      @RequestBody Map<String, String> request) {

    String newPassword = request.get("newPassword");

    if (newPassword == null || newPassword.isEmpty()) {

      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST,
          "A nova senha não pode ser vazia.");
    }

    try {

      passwordResetService.resetPassword(token, newPassword);

      return ResponseEntity.ok().build();

    } catch (Excecao e) {

      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST,
          e.getMessage(),
          e);
    }
  }
}