**Collection types for chromadb**
    -- Hospital general information : metadata { hospital_name }
    -- Information about doctors (name, experience, category) { hospital_name }
    -- Patient health history : metadata { patient_id, hospital_name }

**AI Agent tools**
    -- sign up patient to the doctor (sing_up_patient)
            metadata: { name="sing_up_patient", description="Tool which sings up a patient to the doctor" }
    -- health history of patient
            metadata: { name="patient_health_history", description="Tool to get health history, analyzes etc. about patient" }
    -- query tool for finding info about hospital 
    -- query tool for finding info about doctors
    -- query tool to provide price list
