from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from transformers import T5ForConditionalGeneration, T5Tokenizer
import os

app = Flask(__name__)
CORS(app)

# Load model and tokenizer
model_name = "t5-small"  # You can use "t5-base" or "t5-large" for better results
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)

@app.route('/summarize', methods=['POST'])
def summarize():
    try:
        data = request.json
        text = data.get('text', '')
        length_param = data.get('length', 0.5)  # Default to medium length
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400
        
        # Prepare the text for T5
        preprocessed_text = "summarize: " + text
        
        # Tokenize the text
        inputs = tokenizer.encode(preprocessed_text, return_tensors="pt", max_length=1024, truncation=True)
        
        # Calculate max_length based on input length and desired summary length
        input_length = len(tokenizer.encode(text))
        max_length = max(30, int(input_length * length_param))  # Ensure minimum length
        min_length = max(20, int(max_length * 0.7))  # Set min_length as a percentage of max_length
        
        # Generate summary
        summary_ids = model.generate(
            inputs, 
            max_length=max_length, 
            min_length=min_length,
            length_penalty=2.0, 
            num_beams=4, 
            early_stopping=True
        )
        
        summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
        
        return jsonify({'summary': summary})
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)

