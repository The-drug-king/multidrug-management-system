package thedrugking.mms.domain.user.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Getter
@Entity
@DiscriminatorValue("M")
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class MedicalPerson extends User {

    @OneToMany(mappedBy = "medicalPerson")
    private List<Follow> followList = new ArrayList<>();
//
//    @OneToMany(mappedBy = "medicalPerson")
//    private List<Comment> commentList = new ArrayList<>();
}
