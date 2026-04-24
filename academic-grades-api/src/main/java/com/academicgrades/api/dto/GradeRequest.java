package com.academicgrades.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Schema(description = "Request body used to register a grade.")
public class GradeRequest {

    @Schema(
            description = "Grade value assigned to the student.",
            example = "4.5"
    )
    private BigDecimal value;

    @Schema(
            description = "ID of the student who receives the grade.",
            example = "1"
    )
    private Long studentId;

    @Schema(
            description = "ID of the subject associated with the grade.",
            example = "1"
    )
    private Long subjectId;
}