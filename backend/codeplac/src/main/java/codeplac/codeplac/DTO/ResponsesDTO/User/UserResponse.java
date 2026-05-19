package codeplac.codeplac.DTO.ResponsesDTO.User;

import codeplac.codeplac.Enum.UserTipo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
  private String email;
  private String nome;
  private String sobrenome;
  private String telefone;
  private String cpf;
  private UserTipo tipoUsuario;
  private String refreshToken;
  private String accessToken;
  private String fotoPerfil; // CORREÇÃO: Adicionado o campo aqui para conseguir enviar a foto de volta pro
                             // React
}