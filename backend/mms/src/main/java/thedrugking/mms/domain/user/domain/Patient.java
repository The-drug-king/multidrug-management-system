package thedrugking.mms.domain.user.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import thedrugking.mms.domain.medicine.domain.MedicineImage;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@DiscriminatorValue("P")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Patient extends User {

    @Getter
    @OneToMany(mappedBy = "patient")
    private List<Follow> followList = new ArrayList<>();

    @OneToMany(mappedBy = "patient")
    private List<MedicineImage> medicineImageList = new ArrayList<>();

    @OneToMany
    private List<MedicalPerson> medicalPersonList = new ArrayList<>();

    public static Patient createPatient(String loginId, String password, String name, LocalDate birthday) {
        Patient patient = new Patient();
        patient.setLoginId(loginId);
        patient.setPassword(password);
        patient.setName(name);
        patient.setBirthday(birthday);
        return patient;
    }
}