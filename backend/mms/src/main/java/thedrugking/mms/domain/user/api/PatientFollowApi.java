package thedrugking.mms.domain.user.api;

import jakarta.annotation.PostConstruct;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import thedrugking.mms.domain.user.dao.MedicalPersonRepository;
import thedrugking.mms.domain.user.dao.PatientRepository;
import thedrugking.mms.domain.user.domain.MedicalPerson;
import thedrugking.mms.domain.user.domain.Patient;
import thedrugking.mms.domain.user.domain.Follow;
import thedrugking.mms.domain.user.dto.FollowRequestDto;
import thedrugking.mms.response.SuccessResponseDto;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/patient")
public class PatientFollowApi {

    private final PatientRepository patientRepository;
    private final MedicalPersonRepository medicalPersonRepository;
    private static final Logger logger = LoggerFactory.getLogger(PatientFollowApi.class);

    // test를 위해 객체 생성
    @PostConstruct
    public void savePatientAndMedicalPerson() {
        Patient patient1 = Patient.createPatient("patientA", "asd456123", "Lee", LocalDate.of(1990, 1, 1));
        MedicalPerson medicalPerson2 = MedicalPerson.createMedicalPerson("medicalPersonB", "q1w2e3", "Kim", LocalDate.of(1980, 5, 15));
        patient1.getFollowList().add(Follow.createFollow(patient1, medicalPerson2));
        patientRepository.save(patient1);
        medicalPersonRepository.save(medicalPerson2);
    }

    @PostMapping("/{patientId}/follow")
    public ResponseEntity<SuccessResponseDto> followMedicalPerson(@PathVariable Long patientId, @RequestBody FollowRequestDto request) {
        logger.info("Received follow request with followId: {}", request.getFollowId());

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("환자를 찾을 수 없음"));
        MedicalPerson medicalPerson = medicalPersonRepository.findById(request.getFollowId())
                .orElseThrow(() -> new RuntimeException("의료인을 찾을 수 없음"));

        // 팔로우 추가
        Follow follow = Follow.createFollow(patient, medicalPerson);

        // 이미 팔로우 중인지 확인
        List<Follow> followList = patient.getFollowList();
        for (Follow existingFollow : followList) {
            if (existingFollow.getMedicalPerson().getId().equals(request.getFollowId())) {
                // 이미 팔로우 중이면 중복 등록 방지
                throw new RuntimeException("이미 팔로우 중인 의료인입니다.");
            }
        }

        // 팔로우 리스트에 추가 -> 나중에 PatientService로 이동
        followList.add(follow);
        logger.info("Added follow to followList: {}", follow);

//        for (Follow exfollow : followList) {
//            logger.info("Follow ID: {}", exfollow.getId()); // 예시로 ID를 출력
//        }
        // 변경사항 저장
        patientRepository.save(patient);

        return ResponseEntity.ok(new SuccessResponseDto());
    }

    @GetMapping("/{patientId}/follow")
    public ResponseEntity<List<MedicalPerson>> getFollowedMedicalPersons(@PathVariable Long patientId) {
        // 환자 ID를 사용하여 팔로우한 의료인 목록을 조회
        Patient patient = patientRepository.findById(patientId).orElseThrow(() -> new RuntimeException("환자를 찾을 수 없음"));

        // 팔로우 리스트 초기화
        List<Follow> followList = patient.getFollowList();

        // 팔로우한 의료인 목록 추출
        List<MedicalPerson> followedMedicalPersons = followList.stream()
                .map(Follow::getMedicalPerson)
                .toList();

        return ResponseEntity.ok(followedMedicalPersons);
    }
}
