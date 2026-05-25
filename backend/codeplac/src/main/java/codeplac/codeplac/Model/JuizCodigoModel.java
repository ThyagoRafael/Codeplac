package codeplac.codeplac.Model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

@Table(name = "Assessment")
public class JuizCodigoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Mapeado para 'teamname'
    @Column(name = "teamname", length = 255, nullable = false)
    private String nomeEquipe;

    // Mapeado para 'leaderName'
    @Column(name = "leaderName", length = 255, nullable = false)
    private String nomeLider;

    // Mapeado para 'codenumber'
    @Column(name = "codenumber", nullable = false)
    private Integer numeroCodigo;

    // CAMPO NOVO: Mapeado para 'filename' (Obrigatório no DB)
    @Column(name = "filename", length = 255, nullable = false)
    private String fileName;

    // CAMPO NOVO: Mapeado para 'teamhash' (Obrigatório no DB)
    @Column(name = "teamhash", length = 128, nullable = false)
    private String teamHash;

    // Mapeado para 'source' (O banco usa LONGBLOB)
    @Lob
    @Column(name = "source", nullable = false, columnDefinition = "LONGBLOB")
    private String codigo;

    // Mapeado para 'created_at'
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime dataEnvio;

    @PrePersist
    protected void onCreate() {
        this.dataEnvio = LocalDateTime.now();
    }
}