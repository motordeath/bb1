from datetime import datetime

COLLEGE_MAP = {
    "164": "PSIT Kanpur",
    "000": "Unknown College"
}

BRANCH_MAP = {
    "100": "CSE",
    "130": "IT",
    "310": "ECE",
    "000": "Unknown Branch"
}

DEGREE_DURATION = {
    "B.Tech": 4,
    "BCA": 3,
    "MCA": 2,
    "Diploma": 3
}

def decode_roll_number(roll_no, degree="B.Tech"):
    # Format: YY 0 CCC 0 BBB RRR (13 digits) or similar
    # Example: 2401640100078
    # YY = 24 (Admission Year 2024)
    # CCC = 164 (College)
    # BBB = 100 (Branch) - extracted from middle
    # RRR = 078 (Roll No)
    
    try:
        roll_str = str(roll_no)
        if len(roll_str) < 10:
            return default_details()

        # 1. Admission Year
        yy = roll_str[0:2]
        admission_year = 2000 + int(yy)

        # 2. College Code (Digits 3,4,5 usually? Let's assume standard AKTU format)
        # 24 0 164 0 100 078 -> indices:
        # 01 : YY
        # 2  : 0
        # 345: CCC (164)
        college_code = roll_str[3:6]
        college_name = COLLEGE_MAP.get(college_code, f"College Code {college_code}")

        # 3. Branch Code (Digits 7,8,9?)
        # 240164 0 100 078
        # 6 : 0
        # 789: BBB (100)
        branch_code = roll_str[7:10]
        branch_name = BRANCH_MAP.get(branch_code, f"Branch Code {branch_code}")

        # 4. Short Roll No
        roll_no_short = roll_str[-4:] # Last 4 digits

        # 5. Passing Year
        duration = DEGREE_DURATION.get(degree, 4)
        passing_year = admission_year + duration

        # 6. Current Year Calculation
        now = datetime.now()
        current_year_num = now.year
        current_month = now.month

        # Academic year starts in August/September
        # If we are in Jan-Aug 2025, we are in (2025 - 2024) + 1 = 2nd Sem? No.
        # Session 2024-2025 -> 1st Year.
        # If now is Nov 2025 -> Session 2025-2026 -> 2nd Year.
        
        # Logic from prompt:
        # if current_month < 9: currentYear = current_year - admission_year
        # else: currentYear = current_year - admission_year + 1
        
        if current_month < 9:
            year_diff = current_year_num - admission_year
        else:
            year_diff = current_year_num - admission_year + 1
            
        # Clamp year
        if year_diff < 1: year_diff = 1
        if year_diff > duration: year_diff = duration
        
        suffix = "th"
        if year_diff == 1: suffix = "st"
        elif year_diff == 2: suffix = "nd"
        elif year_diff == 3: suffix = "rd"
        
        current_year_str = f"{year_diff}{suffix} Year"

        return {
            "degree": degree,
            "branch": branch_name,
            "college": college_name,
            "admission_year": admission_year,
            "passing_year": passing_year,
            "current_year": current_year_str,
            "section": "N/A", # Placeholder
            "roll_no_short": roll_no_short
        }

    except Exception as e:
        print(f"Error decoding roll: {e}")
        return default_details()

def default_details():
    return {
        "degree": "B.Tech",
        "branch": "Unknown",
        "college": "Unknown",
        "admission_year": 2024,
        "passing_year": 2028,
        "current_year": "1st Year",
        "section": "N/A",
        "roll_no_short": "0000"
    }
