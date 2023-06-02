import speech_recognition as sr
from fuzzywuzzy import fuzz

# Create a Recognizer instance
r = sr.Recognizer()

# The target words
shwaye = "shwaye shwaye"
hayde = "hayde hayde"

while True:  # Infinite loop to keep the program listening
    with sr.Microphone() as source:
        print("Listening...")
        # Read the audio data from the default microphone
        audio_data = r.record(source, duration=5)  # You can change the duration as needed
        print("Recognizing...")
        # Convert speech to text
        try:
            text = r.recognize_google(audio_data).lower()
            print(f"Recognized: {text}")

            # Calculate the similarity of the recognized text to the target words
            shwaye_similarity = fuzz.ratio(text, shwaye)
            hayde_similarity = fuzz.ratio(text, hayde)

            if shwaye_similarity > hayde_similarity:
                print("Detected: shwaye shwaye")
                # Insert code to perform action when 'shwaye' is detected
            else:
                print("Detected: hayde hayde")
                # Insert code to perform action when 'hayde' is detected

        except sr.UnknownValueError:
            print("Google Speech Recognition could not understand the audio")
        except sr.RequestError as e:
            print(f"Could not request results from Google Speech Recognition service; {e}")
