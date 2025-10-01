from transformers import AutoModelForCausalLM, AutoTokenizer


def main() -> None:
    # Load model and tokenizer
    model_name = "microsoft/DialoGPT-medium"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(model_name)

    # Set up prompt
    prompt = "Give me an overview of TAC-459 at USC"

    # Generate response
    inputs = tokenizer.encode(prompt, return_tensors="pt")
    outputs = model.generate(
        inputs,
        max_length=150,
        pad_token_id=tokenizer.eos_token_id,
        do_sample=True,
        temperature=0.7,
    )
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)

    print(response)


if __name__ == "__main__":
    main()
