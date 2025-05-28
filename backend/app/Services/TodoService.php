<?php

namespace App\Services;

use App\Repositories\TodoRepository;

class TodoService
{
    protected TodoRepository $todoRepository;

    public function __construct(TodoRepository $todoRepository)
    {
        $this->todoRepository = $todoRepository;
    }

    /**
     * TODO 一覧取得
     *
     * @param int $userId
     * @return array
     */
    public function getList(int $userId): array
    {
        $todos = $this->todoRepository->getByUserId($userId);
        if (!$todos) {
            return [
                'status'  => 'error',
                'message' => 'Todoが見つかりません。',
            ];
        }

        return [
            'status' => 'success',
            'data'   => $todos,
        ];
    }

    /**
     * TODO 取得
     *
     * @param int $todoId
     * @return array
     */
    public function getById(int $todoId): array
    {
        $todo = $this->todoRepository->find($todoId);
        if (!$todo) {
            return [
                'status'  => 'error',
                'message' => 'Todoリストが見つかりません。',
            ];
        }

        return [
            'status' => 'success',
            'data'   => $todo,
        ];
    }

    /**
     * TODO 新規作成
     *
     * @param int $userId
     * @param array $param
     * @return array
     */
    public function create(int $userId, array $param): array
    {
        $todo = $this->todoRepository->create($userId, $param);

        return [
            'status' => 'success',
            'data'   => $todo,
        ];
    }

    /**
     * TODO 更新
     *
     * @param int $todoId
     * @param array $param
     * @return array
     */
    public function update(int $todoId, array $param): array
    {
        $todo = $this->todoRepository->update($todoId, $param);
        if (!$todo) {
            return [
                'status'  => 'error',
                'message' => 'Todoが見つかりません。',
            ];
        }

        return [
            'status' => 'success',
            'data'   => $todo,
        ];
    }

    /**
     * TODO 削除
     *
     * @param int $todoId
     * @return array
     */
    public function delete(int $todoId): array
    {
        $todo = $this->todoRepository->delete($todoId);
        if (!$todo) {
            return [
                'status'  => 'error',
                'message' => 'Todoが見つかりません。',
            ];
        }

        return [
            'status' => 'success',
            'message' => 'Todoを削除しました。',
        ];
    }
}
