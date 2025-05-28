<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Response;

class PutTodoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'todoId'      => $this->route('todoId'),
            'description' => $this->input('description', null)
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'todoId'      => 'required|integer|exists:todos,id',
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'status'      => 'required|integer|in:0,1,2',
        ];
    }

    /**
     * Handle a failed validation attempt.
     */
    public function failedValidation(Validator $validator)
    {
        throw new ValidationException($validator, response()->json(
            ['errors' => $validator->errors()],
            Response::HTTP_UNPROCESSABLE_ENTITY,
            [],
            JSON_UNESCAPED_UNICODE
        ));
    }
}
