package thedrugking.mms.domain.user.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import thedrugking.mms.domain.medicine.domain.MedicineImage;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@DiscriminatorValue("P")
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class Patient extends User {

    @Getter
    @OneToMany(mappedBy = "patient")
    private List<Follow> followList = new ArrayList<>();

    @OneToMany(mappedBy = "patient")
    private List<MedicineImage> medicineImageList = new ArrayList<>();

}


