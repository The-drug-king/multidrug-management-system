package thedrugking.mms.domain.user.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Getter
@Entity
@DiscriminatorValue("M")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MedicalPerson extends User {

    @OneToMany(mappedBy = "medicalPerson")
    private List<Follow> followList = new ArrayList<>();
//
//    @OneToMany(mappedBy = "medicalPerson")
//    private List<Comment> commentList = new ArrayList<>();

    public static MedicalPerson createMedicalPerson(String loginId, String password, String name, LocalDate birthday) {
        MedicalPerson medicalPerson = new MedicalPerson();
        medicalPerson.setLoginId(loginId);
        medicalPerson.setPassword(password);
        medicalPerson.setName(name);
        medicalPerson.setBirthday(birthday);
        return medicalPerson;
    }
}