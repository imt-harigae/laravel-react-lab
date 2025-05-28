<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use App\Services\todoService;
use App\Http\Requests\GetTodoRequest;
use App\Http\Requests\PostTodoRequest;
use App\Http\Requests\PutTodoRequest;
use App\Http\Requests\DeleteTodoRequest;

class TodoController extends Controller
{
    protected TodoService $todoService;

    public function __construct(TodoService $todoService)
    {
        $this->todoService = $todoService;
    }

    /**
     * Todo 一覧取得
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $userId = 1; //TODO : ユーザーIDを取得する処理を実装する
        $todos = $this->todoService->getList($userId);

        return response()->json(
            $todos,
            Response::HTTP_OK,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    /**
     * Todo 取得
     *
     * @param GetTodoRequest $request
     * @return JsonResponse
     */
    public function show(GetTodoRequest $request): JsonResponse
    {
        $userId = 1; //TODO : ユーザーIDを取得する処理を実装する
        $param = $request->validated();
        $todoId = $param['todoId'];
        $todo = $this->todoService->getById($todoId);

        return response()->json(
            $todo,
            Response::HTTP_OK,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    /**
     * Todo 新規作成
     *
     * @param PostTodoRequest $request
     * @return JsonResponse
     */
    public function store(PostTodoRequest $request): JsonResponse
    {
        $userId = 1; //TODO : ユーザーIDを取得する処理を実装する
        $param = $request->validated();

        $todo = $this->todoService->create($userId, $param);

        return response()->json(
            $todo,
            Response::HTTP_CREATED,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    /**
     * Todo 更新
     *
     * @param PutTodoRequest $request
     * @return JsonResponse
     */
    public function update(PutTodoRequest $request): JsonResponse
    {
        $userId = 1; //TODO : ユーザーIDを取得する処理を実装する
        $param = $request->validated();
        $todoId = $param['todoId'];

        $todo = $this->todoService->update($todoId, $param);

        return response()->json(
            $todo,
            Response::HTTP_OK,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    /**
     * Todo 削除
     *
     * @param DeleteTodoRequest $request
     * @return JsonResponse
     */
    public function destroy(DeleteTodoRequest $request): JsonResponse
    {
        $userId = 1; //TODO : ユーザーIDを取得する処理を実装する
        $param = $request->validated();
        $todoId = $param['todoId'];

        $todo = $this->todoService->delete($todoId);

        return response()->json(
            $todo,
            Response::HTTP_OK,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }
}
