package thedrugking.mms.domain.user.api;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import thedrugking.mms.domain.user.dao.MedicalPersonRepository;
import thedrugking.mms.domain.user.dao.PatientRepository;
import thedrugking.mms.domain.user.domain.MedicalPerson;
import thedrugking.mms.domain.user.domain.Patient;
import thedrugking.mms.domain.user.domain.Follow;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/patient")
public class PatientFollowApi {

    private final PatientRepository patientRepository;
    private final MedicalPersonRepository medicalPersonRepository;

    // test를 위해 객체 강제 생성
    public void savePatientAndMedicalPerson() {
        Patient patient1 = new Patient();
        patient1.setLoginId("patientA");
        patient1.setPassword("asd456123");
        patient1.setName("Lee");
        patient1.setBirthday(LocalDate.of(1990, 1, 1));

        MedicalPerson medicalPerson2 = new MedicalPerson();
        medicalPerson2.setLoginId("medicalPersonB");
        medicalPerson2.setPassword("q1w2e3");
        medicalPerson2.setName("Kim");
        medicalPerson2.setBirthday(LocalDate.of(1980, 5, 15));

        patientRepository.save(patient1);
        medicalPersonRepository.save(medicalPerson2);
    }

    @PostMapping("/{patientId}/follow/{medicalPersonId}")
    public void followMedicalPerson(@PathVariable Long patientId, @PathVariable Long medicalPersonId) {
        Patient patient = patientRepository.findById(patientId).orElseThrow(() -> new RuntimeException("환자를 찾을 수 없음"));
        MedicalPerson medicalPerson = medicalPersonRepository.findById(medicalPersonId).orElseThrow(() -> new RuntimeException("의료인을 찾을 수 없음"));

        // 이미 팔로우 중인지 확인
        List<Follow> followList = patient.getFollowList();
        for (Follow follow : followList) {
            if (follow.getMedicalPerson().getId().equals(medicalPersonId)) {
                // 이미 팔로우 중이면 중복 등록 방지
                throw new RuntimeException("이미 팔로우 중인 의료인입니다.");
            }
        }

        // 팔로우 추가
        Follow follow = new Follow();
        follow.setPatient(patient);
        follow.setMedicalPerson(medicalPerson);
        followList.add(follow);

        // 변경사항 저장
        patientRepository.save(patient);


    }

    @GetMapping("/{patientId}/follow")
    public List<Follow> getFollowedMedicalPersons(@PathVariable Long patientId) {
        // 환자 ID를 사용하여 팔로우한 의료인 목록을 조회
        Patient patient = patientRepository.findById(patientId).orElseThrow(() -> new RuntimeException("환자를 찾을 수 없음"));
        return patient.getFollowList();
    }
}