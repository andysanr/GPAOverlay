import pandas as pd
import json

with open("Scripts/DataDist.json", "r") as file:
    data = json.load(file)

output_data = []
for item in data:
    professorName = item["InstructorName"]
    last_first = professorName.split(',')
    new_name = last_first[1].strip() + ' ' + last_first[0].strip()
    item["InstructorName"] = new_name
    output_data.append(item)

df = pd.DataFrame(output_data)

pd.set_option('display.max_rows', None)

grade_mapping = {
    'AGrades': 4.0,
    'BGrades': 3.0,
    'CGrades': 2.0,
    'DGrades': 1.0,
    'FGrades': 0.0,
    'NCGrades': 0.0,
}

avg_grade_mapping = {
    'AGrades': 3.835,
    'BGrades': 3.0,
    'CGrades': 2.165,
    'DGrades': 1.0,
    'FGrades': 0.0,
    'NCGrades': 0.0,
}

instructor_course = df.groupby(['InstructorName', 'Course'])

overall_active_students = instructor_course['TotalEnrollment'].sum() - ((instructor_course['NRGrades'].sum()) + (instructor_course['DRGrades'].sum()))

overall_grade = (
    (grade_mapping['AGrades'] * instructor_course['AGrades'].sum()) +
    (grade_mapping['BGrades'] * instructor_course['BGrades'].sum()) +
    (grade_mapping['CGrades'] * instructor_course['CGrades'].sum()) +
    (grade_mapping['DGrades'] * instructor_course['DGrades'].sum()) +
    (grade_mapping['FGrades'] * instructor_course['FGrades'].sum()) +
    (grade_mapping['NCGrades'] * instructor_course['NCGrades'].sum())
)

overall_gpa = overall_grade/overall_active_students

avg_overall_grade = (
    (avg_grade_mapping['AGrades'] * instructor_course['AGrades'].sum()) +
    (avg_grade_mapping['BGrades'] * instructor_course['BGrades'].sum()) +
    (avg_grade_mapping['CGrades'] * instructor_course['CGrades'].sum()) +
    (avg_grade_mapping['DGrades'] * instructor_course['DGrades'].sum()) +
    (avg_grade_mapping['FGrades'] * instructor_course['FGrades'].sum()) +
    (avg_grade_mapping['NCGrades'] * instructor_course['NCGrades'].sum())
)

avg_overall_gpa = avg_overall_grade/overall_active_students

output_data = []
for key, group in instructor_course:
    instructor_name = key[0]
    course = key[1]
    theavg_overall_gpa = avg_overall_gpa[key]
    theoverall_gpa = overall_gpa[key]
    min_overall_gpa = min(theavg_overall_gpa, theoverall_gpa)
    max_overall_gpa = max(theavg_overall_gpa, theoverall_gpa)

    if min_overall_gpa == theavg_overall_gpa:
        print(f"Professor: {instructor_name:<35} Course: {course:<15} Estimated GPA: {theavg_overall_gpa:.2f} - {theoverall_gpa:.2f}")
        output_data.append({"InstructorName": instructor_name, "Course": course, "MinGPA": round(min_overall_gpa, 2), "MaxGPA": round(max_overall_gpa, 2)})
    else:
        print(f"Professor: {instructor_name:<35} Course: {course:<15} Estimated GPA: {theoverall_gpa:.2f} - {theavg_overall_gpa:.2f}")
        output_data.append({"InstructorName": instructor_name, "Course": course, "MinGPA": round(min_overall_gpa, 2), "MaxGPA": round(max_overall_gpa, 2)})
  
with open("output.json", "w") as output_file:
    json.dump(output_data, output_file)

  